import axios from "axios";
import { BASE_URL, DEFAULT_AVATAR } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../features/feed/feedSlice";

const UserCard = ({ userData, showActions = true }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = userData;

  const handleRequestClick = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err.message);
      console.log(err.response);
    }
  };

  return (
    <article className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-base-content/10 bg-base-300 shadow-xl">
      <figure className="relative h-72 overflow-hidden sm:h-80">
        <img
          src={photoUrl || DEFAULT_AVATAR}
          alt={`${firstName || ""} ${lastName || ""}`.trim() || "Profile photo"}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-base-300 to-transparent" />
      </figure>
      <div className="space-y-2 px-5 pb-5 pt-2">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          {`${firstName || ""} ${lastName || ""}`.trim()}
        </h2>
        {age && gender && (
          <p className="text-sm capitalize text-base-content/60">
            {age}, {gender}
          </p>
        )}
        {about && (
          <p className="line-clamp-3 text-sm leading-relaxed text-base-content/75">
            {about}
          </p>
        )}
        {showActions && (
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              className="btn btn-outline min-h-11 flex-1"
              onClick={() => handleRequestClick("ignored", _id)}
            >
              Ignore
            </button>
            <button
              type="button"
              className="btn btn-primary min-h-11 flex-1"
              onClick={() => handleRequestClick("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;
