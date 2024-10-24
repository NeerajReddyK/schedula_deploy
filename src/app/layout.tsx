import '../styles/global.css';

export const metadata = {
  title: 'Schedula - Doctor Appointment Enabler',
  description: 'Patients can book an appointment with available doctors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-slate-50"
      >
        {children}
      </body>
    </html>
  );
}
