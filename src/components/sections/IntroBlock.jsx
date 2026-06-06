import Block from '../layout/Block'

export default function IntroBlock() {
  return (
    <Block
      id="intro"
      size="sm"
      bg="ink"
      noPadding
      className="!w-[calc((100vh-1.5rem)*0.8)]"
    >
      <img
        src="/Main.gif"
        alt="Alireza Iman — intro"
        className="h-full w-full object-contain select-none"
        draggable={false}
      />
    </Block>
  )
}
