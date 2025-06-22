import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FootballCard from '../components/FootballCard';
import shirtsData from '../data/shirtsData.js';

const CategoryPage = () => {
  const { categoryId } = useParams();

  const filteredShirts = useMemo(() => {
    if (!categoryId || categoryId === 'all') return shirtsData;
    return shirtsData.filter(shirt => shirt.category === categoryId);
  }, [categoryId]);

  return (
    <section className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8 text-center">
        {categoryId === 'all' ? 'ყველა მაისური' : `${categoryId} მაისურები`}
      </h1>
      {filteredShirts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredShirts.map(shirt => (
            <FootballCard key={shirt.id} shirt={shirt} onAddToCart={() => {}} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">მაისურები ვერ მოიძებნა.</p>
      )}
    </section>
  );
};

export default CategoryPage;
