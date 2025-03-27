"use client";
import { useTranslations } from "next-intl";
import BenefitSection from "./BenefitSection";
import { b, object, tr } from "framer-motion/client";

function transformData(data) {
    return Object.keys(data)
      .filter(key => key !== "length") // Ignore the length property
      .map(key => ({
        title: data[key].title,
        description: data[key].description,
        imageSrc: data[key].imageSrc,
        bullets: Object.keys(data[key].bullets)
          .filter(bKey => bKey !== "length") // Ignore the length property inside bullets
          .map(bKey => ({
            title: data[key].bullets[bKey].title,
            description: data[key].bullets[bKey].description,
            icon: data[key].bullets[bKey].icon
          }))
      }));
  }

const Benefits: React.FC = () => {
    const t = useTranslations("benefits");

    // Retrieve benefits array from translations
    const benefitsArray = t.raw("items") as Array<any>; 

    const transformedData = transformData(benefitsArray);
    return (
        <div id="features">
            <h2 className="sr-only">Features</h2>
            {transformedData.map((item, index) => (
        <BenefitSection key={index} benefit={item} imageAtRight={index % 2 !== 0} />
      ))}
        </div>
    );
};

export default Benefits;
