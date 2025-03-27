import { motion } from "framer-motion"
import { IBenefitBullet } from "@/types"
import { childVariants } from "./BenefitSection"
import * as FiIcons from "react-icons/fi" // Import all icons

const BenefitBullet: React.FC<IBenefitBullet> = ({ title, description, icon }: IBenefitBullet) => {
  
    const IconComponent = FiIcons[icon as keyof typeof FiIcons] || null; // Get the correct icon

    return (
        <motion.div
            className="flex flex-col items-center mt-8 gap-3 lg:gap-5 lg:flex-row lg:items-start"
            variants={childVariants}
        >
            <div className="flex justify-center mx-auto lg:mx-0 flex-shrink-0 mt-3 w-fit text-2xl">
                {IconComponent && <IconComponent />} {/* Render icon if found */}
            </div>
            <div>
                <h4 className="text-lg font-semibold">
                    {title}
                </h4>
                <p className="text-base text-foreground-accent">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

export default BenefitBullet
