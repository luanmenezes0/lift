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
  Tooltip,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { buildingSiteModalAtom } from "../atoms/buildingSiteModalAtom";
import { deleteBuildingSiteAtom } from "../atoms/deleteBuildingSiteAtom";
import useGetBuildingSitesQuery from "../queries/useGetBuildingSitesQuery";
import BuildingSitesModal from "./BuildingSitesModal";
import DeleteBuildingSiteDialog from "./DeleteBuildingSiteDialog";

export default function BuildingSites() {
  const { data, isLoading } = useGetBuildingSitesQuery();

  const [dialogState, setDialogState] = useAtom(deleteBuildingSiteAtom);
  const [modalState, setModalState] = useAtom(buildingSiteModalAtom);

  const resetDialogState = useResetAtom(deleteBuildingSiteAtom);
  const resetModalState = useResetAtom(buildingSiteModalAtom);

  function onOpenDeleteDialog(id: number, description: string) {
    setDialogState({ id, show: true, description });
  }

  function onOpenModalForEdition(id: number) {
    setModalState({ show: true, id, editMode: true });
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
                      <Tooltip label="Editar Obra">
                        <IconButton
                          variant="ghost"
                          aria-label="Editar Obra"
                          icon={<EditIcon />}
                          onClick={() => onOpenModalForEdition(bs.id)}
                        />
                      </Tooltip>

                      <Tooltip label="Deletar Obra">
                        <IconButton
                          variant="ghost"
                          aria-label="Deletar Obra"
                          icon={<DeleteIcon />}
                          onClick={() =>
                            onOpenDeleteDialog(bs.id, bs.description)
                          }
                        />
                      </Tooltip>
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>

      {modalState.show && (
        <BuildingSitesModal
          onClose={resetModalState}
          editMode={modalState.editMode}
        />
      )}

      {dialogState.show && (
        <DeleteBuildingSiteDialog onClose={resetDialogState} />
      )}
    </>
  );
}
