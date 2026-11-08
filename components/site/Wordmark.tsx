import { salon } from "@/config/salon.config";

/** The logo. Swap `logo.imageSrc` in the configuration to use a real logo file instead of the text wordmark. */
export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#top" className="wordmark" aria-label={`${salon.name}, back to the top of the page`} onClick={onClick}>
      {salon.logo.imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={salon.logo.imageSrc} alt="" className="wordmark__image" height={40} />
      ) : (
        <>
          <span className="wordmark__name">{salon.logo.text}</span>
          <span className="wordmark__sub">{salon.descriptor}</span>
        </>
      )}
    </a>
  );
}
