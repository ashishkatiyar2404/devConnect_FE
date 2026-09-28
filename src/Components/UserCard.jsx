const UserCard = ({ userData }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = userData;
  return (
    <div className="flex justify-center my-5">
      <div className="card bg-amber-100 w-96 shadow-xl">
        <figure className="h-80 overflow-hidden">
          <img
            src={photoUrl}
            alt="photo"
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
