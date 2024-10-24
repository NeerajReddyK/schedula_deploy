'use client';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  age: Yup.number()
    .required('Age is required')
    .positive('Age must be positive')
    .integer('Age must be a whole number')
    .max(150, 'Age must be less than 150'),
  gender: Yup.string()
    .required('Gender is required')
    .oneOf(['Male', 'Female', 'Other'], 'Invalid gender selection'),
  mobileNumber: Yup.string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be positive'),
  problem: Yup.string()
    .required('Problem description is required')
    .min(10, 'Please provide more detail about the problem'),
  relationshipWithPatient: Yup.string()
    .required('Relationship is required'),
});

const PatientDetailsForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get('appointmentId');
  const dbUrl = process.env.NEXT_PUBLIC_DB_URL;

  const formik = useFormik({
    initialValues: {
      fullName: '',
      age: '',
      gender: '',
      mobileNumber: '',
      weight: '',
      problem: '',
      relationshipWithPatient: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch(`${dbUrl}/appointments/${appointmentId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientDetails: values,
          }),
        });

        if (response.ok) {
          // eslint-disable-next-line no-alert
          alert('Details added successfully');
          router.push(`/scheduled?appointmentId=${appointmentId}`);
        } else {
          throw new Error('Failed to update patient details');
        }
      } catch (error) {
        console.error('Error updating patient details:', error);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className=" flex w-1/4 flex-col items-center justify-center rounded-lg bg-white p-6 shadow-xl">
        <h3 className="p-4 text-2xl font-semibold">Patient Details</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              {...formik.getFieldProps('fullName')}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.fullName}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <input
                id="age"
                type="number"
                {...formik.getFieldProps('age')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="mt-1 text-sm text-red-500">{formik.errors.age}</div>
              )}
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                {...formik.getFieldProps('gender')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="mt-1 text-sm text-red-500">{formik.errors.gender}</div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              type="tel"
              {...formik.getFieldProps('mobileNumber')}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            {formik.touched.mobileNumber && formik.errors.mobileNumber && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.mobileNumber}</div>
            )}
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight (Kg)
            </label>
            <input
              id="weight"
              type="number"
              {...formik.getFieldProps('weight')}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            {formik.touched.weight && formik.errors.weight && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.weight}</div>
            )}
          </div>

          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-gray-700">
              Problem
            </label>
            <textarea
              id="problem"
              {...formik.getFieldProps('problem')}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            />
            {formik.touched.problem && formik.errors.problem && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.problem}</div>
            )}
          </div>

          <div>
            <label htmlFor="relationshipWithPatient" className="block text-sm font-medium text-gray-700">
              Relationship with Patient
            </label>
            <select
              id="relationshipWithPatient"
              {...formik.getFieldProps('relationshipWithPatient')}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select relationship</option>
              <option value="Self">Self</option>
              <option value="Parent">Son</option>
              <option value="Spouse">Brother</option>
              <option value="Child">Sister</option>
            </select>
            {formik.touched.relationshipWithPatient && formik.errors.relationshipWithPatient && (
              <div className="mt-1 text-sm text-red-500">{formik.errors.relationshipWithPatient}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-sky-400 px-4 py-3 font-semibold text-white transition-colors hover:bg-sky-500"
          >
            Save
          </button>
        </form>
      </div>

    </div>
  );
};

export default PatientDetailsForm;
