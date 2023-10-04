export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12) || 12;
  const formattedMinutes = minutes.toString().padStart(2, '0');
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

export const handleInputKeyPress = (e, isLoading, handleSendMessage) => {
  if (e.key === 'Enter' && !isLoading) {
    handleSendMessage();
  }
};


