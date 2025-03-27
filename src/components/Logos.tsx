import { useTranslations } from "next-intl";
import { FaCamera, FaBrain, FaMicrochip } from "react-icons/fa";
import { SiOpencv, SiTensorflow, SiPytorch } from "react-icons/si";

const Logos: React.FC = () => {
        const t = useTranslations('technologies');
    
    return (
        <section id="logos" className="py-20 px-5 bg-background">
            <p className="text-lg font-medium mb-10 text-center text-[#304fff]">
                {t('heading')}
            </p>
            <div className="mt-5 w-full flex flex-wrap flex-row items-center justify-evenly gap-5 sm:gap-10 opacity-90 logos-container">
                {/* High-Resolution Cameras */}
                <div className="flex flex-col items-center">
                    <FaCamera className="text-4xl text-[#FED835]" />
                    <p className="text-sm mt-2">{t('text1')}</p>
                </div>

                {/* AI & Deep Learning */}
                <div className="flex flex-col items-center">
                    <FaBrain className="text-4xl text-[#FED835]" />
                    <p className="text-sm mt-2">{t('text2')}</p>
                </div>

                <div className="flex flex-col items-center">
                    <SiTensorflow className="text-4xl text-[#FED835]" />
                    <p className="text-sm mt-2">{t('text3')}</p>
                </div>

                {/* OpenCV for Image Processing */}
                <div className="flex flex-col items-center">
                    <SiOpencv className="text-4xl text-[#FED835]" />
                    <p className="text-sm mt-2">{t('text4')}</p>
                </div>

                {/* PyTorch as an alternative AI framework */}
                <div className="flex flex-col items-center">
                    <SiPytorch className="text-4xl text-[#FED835]" />
                    <p className="text-sm mt-2">{t('text5')}</p>
                </div>

                {/* Hardware Acceleration */}
                <div className="flex flex-col items-center">
                    <FaMicrochip className="text-4xl text-[#FED835]" />
                    <p className="text-sm mt-2">{t('text6')}</p>
                </div>
            </div>
        </section>
    );
};

export default Logos;
