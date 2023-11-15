'use client';

const Category = () => {
  const categoryList = [
    { name: 'Ayakkabı' },
    { name: 'Ayakkabı' },
    { name: 'Ayakkabı' },
    { name: 'Ayakkabı' },
    { name: 'Ayakkabı' },
    { name: 'Ayakkabı' },
    { name: 'Ayakkabı' },
  ];
  return (
    <div className="flex items-center justify-center gap-3 px:3 md:px-10 py-5 md:gap-10 md:py-8  overflow-auto">
      {categoryList.map((category, index) => (
        <div
          className="border text-slate-500 rounded-full min-w-[120px] flex items-center justify-center cursor-pointer px-4 py-2 text-center"
          key={index}
        >
          {category.name}{' '}
        </div>
      ))}
    </div>
  );
};

export default Category;
