import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import retro1 from "../assets/retro/1.jpg";
import retro2 from "../assets/retro/2.jpg";
import retro3 from "../assets/retro/3.jpg";

import kids1 from "../assets/kidsRetro/1.jpg";
import kids2 from "../assets/kidsRetro/2.jpg";

import player1 from "../assets/2025-2026_season_player_version/1.jpg";
import player2 from "../assets/2025-2026_season_player_version/2.jpg";

import fan1 from "../assets/2025-2026_season_fan_version/1.jpg";
import fan2 from "../assets/2025-2026_season_fan_version/2.jpg";

export default function Home() {
  const categories = [
    {
      id: "retro",
      name: "რეტრო მაისურები",
      description: "გაიხსენე ფეხბურთის ისტორია კლასიკური რეტრო მაისურებით.",
      images: [retro1, retro2, retro3],
    },
    {
      id: "kids-retro",
      name: "საბავშვო რეტრო მაისურები",
      description: "პატარა გულშემატკივრებისთვის, ლეგენდარული რეტრო დიზაინით.",
      images: [kids1, kids2],
    },
    {
      id: "player-2025-2026",
      name: "2025-2026 წლის სეზონის მაისურები (მოთამაშის ვერსია)",
      description: "ტექნოლოგიური და კომფორტული მაისურები, ზუსტად ისეთი, როგორსაც მოთამაშეები ატარებენ.",
      images: [player1, player2],
    },
    {
      id: "fan-2025-2026",
      name: "2025-2026 წლის სეზონის მაისურები (ფან ვერსია)",
      description: "აჩვენე შენი გულშემატკივრობა ოფიციალური ფან ვერსიის მაისურით.",
      images: [fan1, fan2],
    },
  ];

  const [imageIndexes, setImageIndexes] = useState([0, 0, 0, 0]);
  const [fadeFlags, setFadeFlags] = useState([true, true, true, true]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeFlags([false, false, false, false]);

      setTimeout(() => {
        setImageIndexes((prev) =>
          prev.map((index, i) => (index + 1) % categories[i].images.length)
        );
        setFadeFlags([true, true, true, true]);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="font-sans text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      {/* Hero Section - No Background */}
      <section className="relative isolate min-h-[80vh] flex items-center justify-center text-gray-900 dark:text-gray-100 px-6 text-center">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Gear Up with <span className="text-yellow-400">FitForma</span>
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-gray-700 dark:text-gray-300">
            ხარისხიანი საფეხბურთო აღჭურვილობა და ტანსაცმელი ყველა მოთამაშისთვის.
            ითამაშე ძლიერად, <span className="font-semibold">აღიჭურვე ჭკვიანურად</span>.
          </p>
          <Link to="/shop">
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg md:text-xl font-semibold shadow-md hover:bg-yellow-300 transition duration-200">
              კოლექციის დათვალიერება
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-950">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            პროდუქტის კატეგორიები
          </h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            იპოვეთ თქვენთვის სასურველი მაისური ჩვენს ფართო კატეგორიებში.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {categories.map((category, i) => {
            const currentImage = category.images[imageIndexes[i]];
            const isVisible = fadeFlags[i];

            return (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                    <img
                      key={currentImage}
                      src={currentImage}
                      alt={category.name}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transition: "opacity 0.5s ease-in-out",
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                      <h3 className="text-xl font-semibold text-white">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-base text-gray-600 dark:text-gray-300">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
