import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-12 px-6 mt-14 bg-blue-50">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 border-b-4 border-blue-500 inline-block pb-2">
          About PeerLearn Academy
        </h2>
        <p className="mt-6 text-lg text-gray-700">
          PeerLearn Academy is an innovative online learning platform that allows students to study together, complete assignments collaboratively, and grow their knowledge. Whether you're looking to excel in your exams or deepen your understanding of a subject, PeerLearn Academy offers the tools to help you succeed.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mt-12 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-blue-600">
          Our Mission
        </h3>
        <p className="mt-6 text-lg text-gray-700">
          At PeerLearn Academy, we aim to create a collaborative learning environment where students can connect, share resources, and help each other achieve academic success. Our mission is to empower learners through peer-to-peer engagement, ensuring everyone has access to quality education and support.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {[
          {
            title: "Collaborative Learning",
            text: "Join study groups, exchange knowledge, and work on assignments with peers in a supportive, interactive environment.",
          },
          {
            title: "Flexible Learning",
            text: "Learn at your own pace and on your own schedule. Access materials and resources anytime, anywhere.",
          },
          {
            title: "Personalized Feedback",
            text: "Receive constructive feedback from peers and mentors, ensuring your work gets better with each submission.",
          },
          {
            title: "Engagement & Gamification",
            text: "Participate in challenges, quizzes, and more to engage with the material while earning rewards for your progress.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl border-b p-4 font-semibold text-blue-700">{item.title}</h3>
            <p className="mt-3 p-4 bg-blue-300 text-gray-600">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-bold text-blue-600">Join the PeerLearning Movement</h3>
        <p className="text-lg text-gray-700 mt-4">
          Ready to take your learning to the next level? Sign up today and start collaborating with peers on exciting educational journeys.
        </p>
        <Link to="/signIn">
          <button
            aria-label="Join PeerLearn Academy"
            className="px-6 py-2 mt-4 bg-blue-500 hover:bg-blue-700 text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Join Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default About;
