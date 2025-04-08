import React from 'react';

const Profile = () => {
  return (
    <div className='bg-[#E0E0E4]'>
    <div className="max-w-4xl mx-auto p-9 border h-[600px] w-[870px] shadow-md pl-[70px] bg-white ">
      <div className='flex gap-[240px]'>
      <div>
      <h1 className="text-2xl font-bold mb-4 ">Your Profile</h1>
      <p className='mt-1'>Manage your personal information and preferences</p>
      </div>
      <button className="mt-4 px-4 py-2 bg-black text-white rounded">Edit Profile</button>
      </div>
       
       <div className='flex mt-12 gap-10'>
        <div>
          <img src="https://s3-alpha-sig.figma.com/img/4738/288d/20f48ba709c45fef88da7b2feb1d1dbc?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=scdBNnlq8luiOtP2TID~howRnrcHzTJgDMTNCBnpxAmn-hrmJjltvmMWbcJNFSOW1~dyRi5ET6fZlnPEwMuZtnFnYv2kMeIh5JqGypvo9kzVqElLXhCywZTBpRxcm6gUaFYSSz3FFxey-OVm77m6syj8Wt9CkOL1GzXCjDmRAIXq41Wa1i2PW~CoNZYBXTqPKU3YpZXe0YR5HTcfK3GUTRAszA2TyuMVDPVt2U44Her2se8aOTDnn4mY4IX8zrujs7tRtnNNGjfXf7SOO~eIcEnakfwR8w2-6uwtWBO9QiNJpF9btQvmJ4S2op~zrlMX7h0hB7RwyNaj4UVeydw~lg__" alt="" className='h-[100px] w-[100px] rounded-full' />
          <h2 className='font-semibold mt-3'>Inclusive Access Team</h2>
          <p className='mt-3'>AccessPro Events</p>
        </div>
      <div className="bg-white p-4 rounded-lg">
       <div><p>Email</p> <p className=' mt-1'>InclusiveAccessTeam@gmail.com</p></div>
       <div className='mt-8'><p>Phone</p> <p className=' mt-1'>+233 245487544</p></div>
       <div  className='mt-8'><p>Organization</p> <p className=' mt-1'>AccessPro Events</p></div>
       <div  className='mt-8'><p>Bio</p> <p className=' mt-1'>Event organizer with 5+ years of experience in creating accessible </p>
        <p> venues for all attendees.</p></div>
        </div>
      </div>

    </div>
    </div>
  );
};

export default Profile;
