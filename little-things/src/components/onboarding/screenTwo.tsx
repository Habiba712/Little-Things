import Slide from '../../constants/Slide';


export default function ScreenTwo({ active }: { active: boolean }) {
  return (
    <Slide
      active={active}
      hero="📖"
      orbit={['🍪', '🎧', '🌿']}
      title="Collect your days"
      subtitle="Every day gets its own page. Add anything — a coffee recipe, a book, a little moment. Nothing is too small."
    />
  );
}