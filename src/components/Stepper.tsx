const Stepper = ({ currentStep }: { currentStep: number }) => {
  const steps = [
    { index: 1, label: "Intelligence" },
    { index: 2, label: "Strength" },
    { index: 3, label: "Speed" },
    { index: 4, label: "Durability" },
    { index: 5, label: "Powers" },
  ];

  return (
    <ol className="flex xsm:flex-col sm:flex-col md:flex-row items-center w-full">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`flex items-center ${index == 4 ? "w-10" : "w-40"} p-1${
            index < steps.length - 1
              ? "after:content-[''] after:w-full after:h-1 after:border-b after:inline-block"
              : ""
          } ${
            currentStep >= index
              ? "after:border-blue-600 dark:after:border-blue-800"
              : "after:border-white dark:after:border-gray-700"
          }`}
        >
          <span
            className={`m-4 ${
              currentStep >= index
                ? "text-blue-600 dark:text-blue-500"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {step.index}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
