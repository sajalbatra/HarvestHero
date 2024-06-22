const SelectRole = () => {
  return (
    <div className="flex justify-evenly pt-[10%] bg-black text-white w-full h-screen flex-wrap">
      {/* LOGIN SECTION */}
      <div className="flex-col max-w-[40%]">
      <h1 className="text-4xl text-center">Already A User? Login</h1>
      <button className="text-2xl">Login as Donor</button>
      <br></br>
      <button className="text-2xl">Login as Ngo</button>
      </div>
      {/* Signup SECTION */}
      <div className="flex-col max-w-[40%] ">
      <h2 className="text-4xl">Create a Account Now</h2>
      <button className="text-2xl ">Join as Donor</button>
      <br></br>
      <button className="text-2xl">Join as Ngo</button>
      </div>
    </div>
  )
}

export default SelectRole