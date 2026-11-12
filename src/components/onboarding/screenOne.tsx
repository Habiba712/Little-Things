import Slide from '../../constants/Slide';

export default function ScreenOne({ active }: { active: boolean }) {
  return (
    <Slide
      active={active}
      hero="☕"
      orbit={['🌙', '🕯️', '🐈‍⬛']}
      title="Little Things"
      subtitle={
        'A journal for the small moments that make a day yours.\n\nCoffee you made. Books you read. Songs you heard. Tiny treats. Beautiful light.'
      }
    />
  );
}