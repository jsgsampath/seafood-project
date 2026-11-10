function Register() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input type="text" placeholder="Username" className="w-full p-2 border mb-3" />
        <input type="email" placeholder="Email" className="w-full p-2 border mb-3" />
        <input type="password" placeholder="Password" className="w-full p-2 border mb-3" />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;