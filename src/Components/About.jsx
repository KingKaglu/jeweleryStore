import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="pt-24 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 font-sans text-center animate-fadeIn py-24 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-8 text-green-700 dark:text-green-400 tracking-wide drop-shadow-md">
          FirForma-ს შესახებ
        </h2>
        <p className="text-xl sm:text-2xl leading-relaxed mb-8 text-gray-800 dark:text-gray-300 max-w-3xl mx-auto">
          FirForma გთავაზობთ მაღალი ხარისხის საფეხბურთო აღჭურვილობას ყველა მოთამაშისთვის.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed mb-8 text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
          ჩვენი პროდუქტები მოიცავს ბურთებს, ფეხსაცმელს, მაისურებს და სხვა აუცილებელ ნივთებს თამაშისთვის.
        </p>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
          ჩვენი მიზანია დაგეხმაროთ თამაშში საუკეთესო შედეგის მიღებაში და გაგვაჩნია ინოვაციური დიზაინი და ხარისხი.
        </p>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
};

export default About;
