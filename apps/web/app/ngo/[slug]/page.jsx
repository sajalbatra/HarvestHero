"use client"
import AllNgo from '../Allngos'; // Adjust import path as per your project structure

export default function NgoPage({ params }) {
  const paramsSlug = params.slug; // Access the dynamic parameter from the route
  const name = paramsSlug.replace(/%20/g, ' '); // Replace URL-encoded spaces with actual spaces
  const ngos = AllNgo(); // Fetch all NGOs (returns the fetched data directly)
  
  const filteredNgo = ngos.filter(ngo => ngo.name === name);

  if (filteredNgo.length === 0) {
    return <div>NGO not found for {paramsSlug}</div>;
  }

  const ngo = filteredNgo[0]; 

  return (
    <div className="container py-4 mx-auto">
    {/* Centered Logo */}
    <div className="flex justify-center mb-4">
      <img src={ngo.ngoProfile.logo} alt={`${ngo.name} Logo`} className="object-cover w-32 h-32 rounded-full" />
    </div>
    
    <h2 className="mb-4 text-3xl font-bold text-center">{ngo.name}</h2>

    {/* Contact Information */}
    <div className="p-4 mb-4 border rounded-lg shadow-md">
      <h3 className="mb-2 text-xl font-semibold">Contact Information</h3>
      <p className="mb-1"><span className="font-semibold">Email:</span> {ngo.email}</p>
      <p className="mb-1"><span className="font-semibold">Phone Number:</span> {ngo.phoneNumber}</p>
    </div>

    {/* Address */}
    <div className="p-4 mb-4 border rounded-lg shadow-md">
      <h3 className="mb-2 text-xl font-semibold">Address</h3>
      <p className="mb-1"><span className="font-semibold">Street Address:</span> {ngo.address.streetAddress}</p>
      <p className="mb-1"><span className="font-semibold">City:</span> {ngo.address.city}</p>
      <p className="mb-1"><span className="font-semibold">State:</span> {ngo.address.state}</p>
      <p className="mb-1"><span className="font-semibold">Postal Code:</span> {ngo.address.postalCode}</p>
      <p className="mb-1"><span className="font-semibold">Country:</span> {ngo.address.country}</p>
    </div>

    {/* NGO Profile */}
    <div className="p-4 mb-4 border rounded-lg shadow-md">
      <h3 className="mb-2 text-xl font-semibold">NGO Profile</h3>
      <p className="mb-1"><span className="font-semibold">Mission:</span> {ngo.ngoProfile.mission}</p>
      <p className="mb-1"><span className="font-semibold">Type:</span> {ngo.ngoProfile.type}</p>
      <p className="mb-1"><span className="font-semibold">Website:</span> <a href={ngo.ngoProfile.website} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{ngo.ngoProfile.website}</a></p>
       <div className="mb-1">
          <span className="font-semibold">Legal Documentation:</span> 
          {ngo.ngoProfile.legalDoc ? (
            <a href={ngo.ngoProfile.legalDoc} className="ml-2 text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">View Document</a>
          ) : (
            <span className="ml-2">Not available</span>
          )}
        </div>       
         
      <p className="mb-1"><span className="font-semibold">Requirements:</span> {ngo.ngoProfile.requirement}</p>
    </div>
  </div>
  );
}
