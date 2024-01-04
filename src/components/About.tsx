function About() {
  return (
    <div className="text-center">
      <p className="font-bold text-2xl p-5 bg-gray-200 rounded-md w-10/12 m-auto">
        v-share is an open source project that helps you to share huge text/code
        with others easily
      </p>
      <p className="font-bold text-orange-400 ">
        note: currently any data shared on this platform is not encrypted and
        not secure{" "}
      </p>
      <p className="font-bold text-lg text-red-500 my-3">
        please do not share your personal details on this platform
      </p>
      <a
        className="hover:bg-black hover:text-white font-bold p-2 rounded-md bg-gray-300 text-black duration-500"
        href="https://github.com/Vishesh-Pandey/v-share"
        target="_blank"
      >
        Github
      </a>
    </div>
  );
}

export default About;
