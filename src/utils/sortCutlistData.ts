import G0P0 from '../assets/G0P0.svg';
import G0P1 from '../assets/G0P1.svg';
import G0P2 from '../assets/G0P2.svg';
import G1P0 from '../assets/G1P0.svg';
import G1P1 from '../assets/G1P1.svg';
import G1P2 from '../assets/G1P2.svg';
import G2P0 from '../assets/G2P0.svg';
import G2P1 from '../assets/G2P1.svg';
import G2P2 from '../assets/G2P2.svg';

type sortCutlistDataProps = {
  side_a_size: number;
  side_b_size: number;
  side_a_border: number;
  side_b_border: number;
};

type sortCutlistDataReturn = {
  gside: number;
  pside: number;
  avatar: string;
};

export const sortCutlistData = ({
  side_a_size,
  side_b_size,
  side_a_border,
  side_b_border,
}: sortCutlistDataProps): sortCutlistDataReturn => {
  let gside: number;
  let pside: number;
  let gborder: number;
  let pborder: number;
  let avatar: string;

  // Sort sizes
  if (side_a_size >= side_b_size) {
    gside = side_a_size;
    gborder = side_a_border;
    pside = side_b_size;
    pborder = side_b_border;
  } else {
    gside = side_b_size;
    gborder = side_b_border;
    pside = side_a_size;
    pborder = side_a_border;
  }

  // Select avatar
  const avatarString = `G${gborder}P${pborder}`;
  switch (avatarString) {
    case 'G0P0':
      avatar = G0P0;
      break;
    case 'G0P1':
      avatar = G0P1;
      break;
    case 'G0P2':
      avatar = G0P2;
      break;
    case 'G1P0':
      avatar = G1P0;
      break;
    case 'G1P1':
      avatar = G1P1;
      break;
    case 'G1P2':
      avatar = G1P2;
      break;
    case 'G2P0':
      avatar = G2P0;
      break;
    case 'G2P1':
      avatar = G2P1;
      break;
    case 'G2P2':
      avatar = G2P2;
      break;
    default:
      avatar = G0P0;
      break;
  }

  return {
    gside,
    pside,
    avatar,
  };
};
