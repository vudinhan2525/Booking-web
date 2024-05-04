export const UserIcon = ({
  width = "1.5rem",
  height = "1.5rem",
  clx = "",
}): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      width={width}
      height={height}
      className={clx}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
};
export const GoogleIcons = ({ width = "1rem", height = "1rem", clx = "" }) => {
  return (
    <svg
      className={clx}
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43 24.4313C43 23.084 42.8767 21.7885 42.6475 20.5449H24.3877V27.8945H34.8219C34.3724 30.2695 33.0065 32.2818 30.9532 33.6291V38.3964H37.2189C40.885 35.0886 43 30.2177 43 24.4313Z"
        fill="#4285F4"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.3872 43.001C29.6219 43.001 34.0107 41.2996 37.2184 38.3978L30.9527 33.6305C29.2165 34.7705 26.9958 35.4441 24.3872 35.4441C19.3375 35.4441 15.0633 32.1018 13.5388 27.6108H7.06152V32.5337C10.2517 38.7433 16.8082 43.001 24.3872 43.001Z"
        fill="#34A853"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.5395 27.6094C13.1516 26.4695 12.9313 25.2517 12.9313 23.9994C12.9313 22.7472 13.1516 21.5295 13.5395 20.3894V15.4668H7.06217C5.74911 18.0318 5 20.9336 5 23.9994C5 27.0654 5.74911 29.9673 7.06217 32.5323L13.5395 27.6094Z"
        fill="#FBBC04"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.3872 12.5568C27.2336 12.5568 29.7894 13.5155 31.7987 15.3982L37.3595 9.94866C34.0018 6.88281 29.6131 5 24.3872 5C16.8082 5 10.2517 9.25777 7.06152 15.4674L13.5388 20.39C15.0633 15.8991 19.3375 12.5568 24.3872 12.5568Z"
        fill="#EA4335"
      ></path>
    </svg>
  );
};
export const SeatAirPlaneIcons = ({
  width = "1rem",
  height = "1rem",
  clx = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width={width}
      fill="#0194F3"
      height={height}
      className={clx}
    >
      <path d="M21,22H9c-.503,0-.762-.332-.851-.474-.088-.144-.269-.523-.044-.974l.99-1.979c.715,.269,1.48,.426,2.276,.426h8.129c.734,0,1.429-.321,1.905-.881s.681-1.302,.562-2.035c-.194-1.188-1.3-2.084-2.573-2.084H11.385c-.674,0-1.27-.454-1.447-1.104l-.788-2.896h9.85c.552,0,1-.447,1-1s-.448-1-1-1H8.606L6.967,1.98C6.631,.701,5.401-.153,4.162,.023c-.704,.104-1.332,.503-1.723,1.095-.391,.592-.512,1.325-.331,2.015l2.99,11.068c.374,1.379,1.184,2.55,2.252,3.393l-1.033,2.065c-.468,.938-.419,2.028,.132,2.919s1.504,1.423,2.552,1.423h12c.552,0,1-.447,1-1s-.448-1-1-1Z" />
    </svg>
  );
};
