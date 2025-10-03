interface PromotionBannerProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  variant?: 'primary' | 'secondary' | 'gradient';
  icon?: React.ReactNode;
}

export default function PromotionBanner({
  title,
  description,
  buttonText,
  buttonLink = '#',
  variant = 'primary',
  icon
}: PromotionBannerProps) {
  const variantClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    gradient: 'bg-gradient-to-r from-primary to-secondary text-white'
  };

  return (
    <div className={`rounded-xl p-6 shadow-sm ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && <div className="flex-shrink-0">{icon}</div>}
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <p className="text-sm opacity-90 mb-4">{description}</p>
          {buttonText && (
            <a
              href={buttonLink}
              className="inline-block px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors text-sm font-medium"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
