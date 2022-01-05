import { Button, Heading, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import React from "react";
import { buildingSiteModalAtom } from "../atoms/buildingSiteModalAtom";
import { deleteBuildingSiteAtom } from "../atoms/deleteBuildingSiteAtom";
import useEditBuildingSitesMutation from "../queries/useEditBuildingSite";
import useGetBuildingSitesQuery from "../queries/useGetBuildingSitesQuery";
import BuildingSitesModal from "./BuildingSitesModal";
import BuildingSitesTable from "./BuildingSitesTable";
import DeleteBuildingSiteDialog from "./DeleteBuildingSiteDialog";

export default function BuildingSites() {
  const { data, isLoading } = useGetBuildingSitesQuery();
  const editBuildingSite = useEditBuildingSitesMutation();

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

  function onInactivateBuildingSite(id: number) {
    editBuildingSite.mutate({ status: "inativo", id });
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

        {data && (
          <BuildingSitesTable
            data={data}
            onOpenDeleteDialog={onOpenDeleteDialog}
            onInactivateBuildingSite={onInactivateBuildingSite}
            onOpenModalForEdition={onOpenModalForEdition}
          />
        )}
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
