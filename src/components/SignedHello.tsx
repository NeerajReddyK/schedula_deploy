import { signOut } from 'next-auth/react';

const handleLogout = () => {
  signOut({
    callbackUrl: '/',
  });
};
const SignedHello = ({ name }: { name: string }) => {
  return (
    <>
      <header className="mx-32 my-12 flex justify-between rounded-lg border bg-white py-3 text-2xl shadow-xl">
        <div className="ml-12 pt-2">
          Hello,
          {' '}
          {name}
          !
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="mr-24 rounded-full border bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        >
          Log Out
        </button>
      </header>
      <body>

      </body>
    </>
  );
};

export default SignedHello;
