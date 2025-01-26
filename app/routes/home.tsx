import { Welcome } from '../welcome/welcome';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'My Finance' },
    { name: 'description', content: 'Welcome to My Finance!' },
  ];
}

export default function Home() {
  return <Welcome />;
}
