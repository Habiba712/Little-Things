import Slide from '../../constants/Slide';


export default function ScreenThree({ active }: { active: boolean }) {
  return (
    <Slide
      active={active}
      hero="🗓️"
      orbit={['🌸', '✨', '📷']}
      title="Look back whenever"
      subtitle="Your journal and calendar keep every day. Flip back through old pages whenever you want to remember."
    />
  );
}