import React from 'react'
import { IParticipantDto } from '../../../apiContracts/chatContracts'
import { Dot, DotsWrapper, Wrapper, Photo } from './TypingIndicator.styled'

interface IProps {
  typingParticipants: IParticipantDto[]
}

const photos = [
  'https://lh4.googleusercontent.com/-PmrpJn6fioQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfiFGyjZLrDvZP8PtyS9vsiewnXg/photo.jpg',
  'https://lh6.googleusercontent.com/-q1SMwJLYqAg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmmzOPTQxZlKBtN73keaphpsjT0IQ/photo.jpg',
  'https://lh6.googleusercontent.com/-qGab-DzMugE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKYJ1jTQ-UuSXjAJg6g9x14bt6kg/photo.jpg',
  'https://lh4.googleusercontent.com/-PmrpJn6fioQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfiFGyjZLrDvZP8PtyS9vsiewnXg/photo.jpg',
  'https://lh6.googleusercontent.com/-q1SMwJLYqAg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmmzOPTQxZlKBtN73keaphpsjT0IQ/photo.jpg',
  'https://lh6.googleusercontent.com/-qGab-DzMugE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKYJ1jTQ-UuSXjAJg6g9x14bt6kg/photo.jpg',
  'https://lh4.googleusercontent.com/-PmrpJn6fioQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmfiFGyjZLrDvZP8PtyS9vsiewnXg/photo.jpg',
  'https://lh6.googleusercontent.com/-q1SMwJLYqAg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmmzOPTQxZlKBtN73keaphpsjT0IQ/photo.jpg',
  'https://lh6.googleusercontent.com/-qGab-DzMugE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckKYJ1jTQ-UuSXjAJg6g9x14bt6kg/photo.jpg'
]

const TypingIndicator: React.FC<IProps> = () => {
  return (
    <Wrapper>
      {photos.map((x, index) => (
        <Photo shiftLeft={-index * 10} src={x} referrerPolicy='no-referrer' />
      ))}
      <DotsWrapper shiftLeft={-(photos.length - 1) * 10}>
        <Dot />
        <Dot />
        <Dot />
      </DotsWrapper>
    </Wrapper>
  )
}

export default TypingIndicator
