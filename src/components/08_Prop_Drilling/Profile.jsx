import React from 'react'

const Profile = ({data}) => {
    
  return (
    <div>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p>{data.password}</p>
        <p>{data.age}</p>
        <p>{data.salary}</p>
    </div>
  )
}

export default Profile