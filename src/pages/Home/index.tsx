import BotaoAdicionar from "../../components/BotaoAdicionar";
import BarraLateral from "../../containers/BarraLateral";
import ListaDeTarefas from "../../containers/BarraLateral/ListaDeTarefas";

const Home = () => (
  <>
  <BarraLateral mostrarFiltros/>
  <ListaDeTarefas/>
  <BotaoAdicionar/>
  </>
)

export default Home
