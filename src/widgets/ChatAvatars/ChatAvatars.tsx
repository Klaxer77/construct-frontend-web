interface ChatAvatarsProps {
  avatars: string[];
  maxVisible?: number;
}

export const ChatAvatars = ({ avatars, maxVisible = 3 }: ChatAvatarsProps) => {
  const visible = avatars.slice(0, maxVisible);
  const remaining = avatars.length - maxVisible;

  return (
    <div className="flex -space-x-[6px] items-center">
      {visible.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`avatar-${index}`}
          className="w-[32px] h-[32px] rounded-full border-[2px] border-white object-cover"
        />
      ))}
      {remaining > 0 && (
        <div className="w-[40px] h-[32px] rounded-[20px] bg-black text-white font-[600] text-[14px] leading-[16px] tracking-[-0.4px] flex items-center justify-center border-[2px] border-white">
          +{remaining}
        </div>
      )}
    </div>
  );
};
