import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { buildingSiteModalAtom } from "../atoms/buildingSiteModalAtom";
import { deleteBuildingSiteAtom } from "../atoms/deleteBuildingSiteAtom";
import useGetBuildingSitesQuery from "../queries/useGetBuildingSitesQuery";
import BuildingSitesModal from "./BuildingSitesModal";
import DeleteBuildingSiteDialog from "./DeleteBuildingSiteDialog";

export default function BuildingSites() {
  const { data, isLoading } = useGetBuildingSitesQuery();

  const [dialogState, setDialogState] = useAtom(deleteBuildingSiteAtom);
  const [modalState, setModalState] = useAtom(buildingSiteModalAtom);

  function onOpenDeleteDialog(id: number) {
    setDialogState({ id, show: true });
  }

  function onCloseBuildingSiteModal() {
    setModalState({ show: false, id: null, editMode: false });
  }

  return (
    <>
      <VStack as="main" spacing={8} align="start">
        <HStack justify="space-between" w="full">
          <Heading as="h1" size="lg" fontWeight="semibold">
            Obras
          </Heading>
          <Button
            onClick={() => setModalState((prev) => ({ ...prev, show: true }))}
          >
            Nova Obra
          </Button>
        </HStack>

        {isLoading && <Spinner />}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Código</Th>
              <Th>Descrição</Th>
              <Th>Endereço</Th>
              <Th>Bairro</Th>
              <Th>Cidade</Th>
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((bs) => (
                <Tr key={bs.id}>
                  <Td>{bs.id}</Td>
                  <Td>{bs.description}</Td>
                  <Td>{bs.address}</Td>
                  <Td>{bs.district}</Td>
                  <Td>{bs.city}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        variant="ghost"
                        aria-label="Deletar Obra"
                        icon={<DeleteIcon />}
                        onClick={() => onOpenDeleteDialog(bs.id)}
                      />
                      <IconButton
                        variant="ghost"
                        aria-label="Editar Obra"
                        icon={<EditIcon />}
                        onClick={() => {
                          setModalState({
                            show: true,
                            id: bs.id,
                            editMode: true,
                          });
                        }}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>

      {modalState.show && (
        <BuildingSitesModal
          onClose={onCloseBuildingSiteModal}
          editMode={modalState.editMode}
        />
      )}

      {dialogState.show && (
        <DeleteBuildingSiteDialog
          onClose={() => setDialogState({ show: false, id: null })}
        />
      )}
    </>
  );
}
