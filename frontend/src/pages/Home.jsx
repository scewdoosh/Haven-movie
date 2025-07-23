import Headers from '../pages/Movies/Header';
import MoviesContainerPage from './Movies/MoviesContainerPage';
export const Home = () => {
  return (
    <>
      <Headers/>
      <section className='mt-[10rem]'>
        <MoviesContainerPage/>  
      </section>
    </>
  )
}
