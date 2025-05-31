interface ReviewHeaderProps {
  CDN: string;
  CDN2: string;
  uidDataCopy: any;
}

const ReviewHeader: React.FC<ReviewHeaderProps> = ({
  CDN,
  CDN2,
  uidDataCopy,
}) => {
  return (
    <div
      id="exportHTML"
      className="mx-auto w-full max-w-[1450px] border rounded-t-xl overflow-hidden"
      style={{
        backgroundImage: `url('${CDN2}/img/character_bg.avif')`,
        marginBlock: "auto",
        width: "100%",
        height: "96px",
      }}
    >
      <div className="flex items-center w-full h-24 text-white smd:text-xl bg-black/50">
        <img
          className="ml-2 smd:ml-5 h-24"
          src={`${CDN}/${uidDataCopy?.player?.avatar.icon}`}
          width={96}
          height={96}
          alt="Avatar"
        />
        <p className="ml-5 flex flex-col">
          <span className="font-bold">{uidDataCopy?.player?.nickname}</span>
          <span className="smd:text-base">
            UID : {uidDataCopy?.player?.uid}
          </span>
        </p>
        <img
          src={`${CDN2}/img/homepage/logo_min.png`}
          className="ml-auto hidden smd:block mr-2 smd:mr-5 h-10 smd:h-14"
          alt="Logo"
        />
        <p className="ml-auto smd:ml-0 mr-5 font-bold">review-hsr.vercel.app</p>
      </div>
    </div>
  );
};

export default ReviewHeader;
