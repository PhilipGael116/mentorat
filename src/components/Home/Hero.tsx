import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative overflow-hidden bg-primary flex flex-col items-center justify-center pt-40 px-6 md:px-16 gap-7">
            {/* Background Blob */}
            <img
                src="/hero-blob.svg"
                className="absolute -top-40 -left-70 w-[500px] opacity-15 pointer-events-none select-none"
                alt=""
            />
            {/* <img
                src="/arrow-hero.svg"
                className="absolute top-[45%] right-0 w-[350px] pointer-events-none select-none -rotate-12 hidden xl:block opacity-60"
                alt=""
            /> */}

            <h1 className="font-heading relative z-10 text-6xl font-bold text-secondary text-center leading-none tracking-[0.02em]">
                {t('hero.title.part1')} <span className="relative inline-block px-1">
                    {t('hero.title.mentor')}
                    <img
                        src="/highlight.svg"
                        className="absolute -bottom-4 left-0 w-full h-6 pointer-events-none select-none"
                        alt=""
                    />
                </span> <br /> {t('hero.title.part2')}
            </h1>

            <p 
                className="relative z-10 text-secondary/70 text-center max-w-2xl leading-normal tracking-[0.004em]"
                dangerouslySetInnerHTML={{ __html: t('hero.description') }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
                <Link to="/register-mentee" className="bg-secondary text-primary px-10 py-4 rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 inline-block text-center">
                    {t('hero.buttons.find')}
                </Link>
                <Link to="/register-mentor" className="border-2 border-secondary text-secondary px-10 py-4 rounded-full font-bold hover:bg-secondary/5 transition-all inline-block text-center">
                    {t('hero.buttons.become')}
                </Link>
            </div>

            <div className="flex items-center md:flex-row flex-col gap-4">
                <img src="/undraw_shared-workspace_6y9d.svg" alt="Mentorship Illustration" className="relative z-10 w-[400px]" />
                <img src="/undraw_junior-soccer_0lib.svg" alt="Mentorship illustration" className="relative z-10 w-[400px] hidden " />
                <img src="/undraw_construction-workers_z99i.svg" alt="Mentorship illustration" className="relative z-10 w-[400px] hidden " />
            </div>
        </section>
    )
}

export default Hero