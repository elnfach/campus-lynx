import Content from "@/config/common.tsx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTelegram, faVk } from '@fortawesome/free-brands-svg-icons';

export default function Footer()
{
    return (
        <footer className="surface-color p-2">
            <div className="flex-col center-items p-8 g-4 max-width-[1280px]">
                <div className="flex gap-4">
                    <a
                        href={Content.footer.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        href={Content.footer.vk}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                    >
                        <FontAwesomeIcon icon={faVk} />
                    </a>
                    <a
                        href={Content.footer.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FontAwesomeIcon icon={faTelegram} />
                    </a>
                </div>

                <div className="">
                    <p>© {Content.info.copyright.year} {Content.header.title}. {Content.info.copyright.content}</p>
                </div>
            </div>
        </footer>
    )
}