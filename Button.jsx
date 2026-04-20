export const Button = ({ children, onClick, variant = 'primary', className }) => {
  const styles = variant === 'primary' 
    ? "bg-white text-black hover:bg-gray-200" 
    : "border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-900";
  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${styles} ${className}`}>
      {children}
    </button>
  );
};