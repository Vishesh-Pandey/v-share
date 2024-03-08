function About() {
  return (
    <div className="text-center">
      <div className="font-bold text-2xl p-5 bg-skin-fill text-skin-base rounded-md w-11/12 m-auto my-2">
        <p className="my-4">
          v-share is an open source project that helps you to share huge
          text/code with others easily
        </p>
        <a
          className="hover:bg-skin-button-accent-hover font-bold p-2 rounded-md duration-500"
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
