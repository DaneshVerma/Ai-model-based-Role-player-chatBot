const TypingIndicator = () => {
  return (
    <div className='flex items-center gap-1 text-gray-500 italic text-sm p-2'>
      <span className='animate-pulse'>Typing</span>
      <span className='animate-pulse'>.</span>
      <span className='animate-pulse'>.</span>
      <span className='animate-pulse'>.</span>
    </div>
  );
};
export default TypingIndicator;
