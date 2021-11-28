import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRef } from "react";
import useDeleteBuildingSiteMutation from "../queries/useDeleteBuildingSiteMutation";
import { deleteBuildingSiteAtom } from "../atoms/deleteBuildingSiteAtom";

export default function DeleteBuildingSiteDialog(props: {
  onClose: () => void;
}) {
  const { onClose } = props;

  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const [{ id, description }] = useAtom(deleteBuildingSiteAtom);

  const deleteBuldingSite = useDeleteBuildingSiteMutation();

  function onDelete() {
    if (id) deleteBuldingSite.mutate(id, { onSettled: onClose });
  }

  return (
    <AlertDialog isOpen leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir Obra
          </AlertDialogHeader>

          <AlertDialogBody>
            <VStack align="start">
              <Text as="i">{description}</Text>
              <Text>Tem certeza? Você não pode desfazer essa ação depois.</Text>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              disabled={deleteBuldingSite.isLoading}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={onDelete}
              ml={3}
              isLoading={deleteBuldingSite.isLoading}
            >
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
