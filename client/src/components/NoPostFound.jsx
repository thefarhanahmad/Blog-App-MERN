import React from "react";

const NoPostsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-700 mb-4">
        No Posts Available
      </h1>
      <p className="text-lg text-gray-500 mb-6">
        It looks like there are no posts to display here yet.
      </p>
    </div>
  );
};

export default NoPostsFound;
