function About() {
  return (
    <div className="text-center">
      <div className="font-bold text-2xl p-5 bg-gray-200 text-gray-600 rounded-md w-11/12 m-auto my-2">
        <p>
          v-share is an open source project that helps you to share huge
          text/code with others easily
        </p>

        <p className="font-bold text-lg text-red-300 my-3">
          please do not share your personal details on this platform
        </p>
        <a
          className="hover:bg-black hover:text-white font-bold p-2 rounded-md bg-gray-300 text-black duration-500"
          href="https://github.com/Vishesh-Pandey/v-share"
          target="_blank"
        >
          <i className="bi bi-github"></i> GitHub
        </a>
      </div>
    </div>
  );
}

export default About;
