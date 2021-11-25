import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { buildingSiteModalAtom } from "../atoms/buildingSiteModalAtom";
import { BuildingSite } from "../models/index";
import useCreateBuildingSitesMutation from "../queries/useCreateBuildingSitesMutation";
import useEditBuildingSitesMutation from "../queries/useEditBuildingSite";
import useGetBuildingSiteQuery from "../queries/useGetBuildingSiteQuery";

interface BuildingSitesModalProps {
  onClose: () => void;
  editMode: boolean;
}

export default function BuildingSitesModal(props: BuildingSitesModalProps) {
  const { onClose, editMode } = props;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BuildingSite>();

  const [{ id }] = useAtom(buildingSiteModalAtom);

  const mutation = useCreateBuildingSitesMutation();
  const editResult = useEditBuildingSitesMutation();
  const { data } = useGetBuildingSiteQuery(id!);

  useEffect(() => {
    if (data) {
      const { address, city, description, district } = data;

      setValue("address", address);
      setValue("city", city);
      setValue("description", description);
      setValue("district", district);
    }
  }, [data, setValue]);

  function onSubmit(values: BuildingSite) {
    if (editMode && id) {
      return editResult.mutate({ ...values, id }, { onSettled: onClose });
    }
    return mutation.mutate(values, { onSettled: onClose });
  }

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="40rem">
        <ModalHeader>
          {editMode ? "Editar " : "Adicionar Nova "}Obra
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack as="form" id="bsform" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel htmlFor="description">Descrição</FormLabel>
              <Input
                id="description"
                {...register("description", {
                  required: "Campo obrigatório",
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.address)}>
              <FormLabel htmlFor="address">Endereço</FormLabel>
              <Input
                id="address"
                {...register("address", {
                  required: "Campo obrigatório",
                })}
              />
              <FormErrorMessage>
                {errors.address && errors.address.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.district)}>
              <FormLabel htmlFor="district">Bairro</FormLabel>
              <Input
                id="district"
                {...register("district", {
                  required: "Campo obrigatório",
                })}
              />
              <FormErrorMessage>
                {errors.district && errors.district.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.city)}>
              <FormLabel htmlFor="city">Cidade</FormLabel>
              <Input
                id="city"
                {...register("city", {
                  required: "Campo obrigatório",
                })}
              />
              <FormErrorMessage>
                {errors.city && errors.city.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button
            form="bsform"
            type="submit"
            variant="ghost"
            isLoading={isSubmitting || mutation.isLoading}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
