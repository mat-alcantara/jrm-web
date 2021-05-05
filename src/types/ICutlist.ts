export default interface ICutlist {
  id: string;
  material_id: string;
  quantidade: number;
  side_a_size: number;
  side_a_border: 0 | 1 | 2;
  side_b_size: number;
  side_b_border: 0 | 1 | 2;
  price: number;
}
