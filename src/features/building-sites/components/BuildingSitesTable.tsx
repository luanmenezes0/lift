import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BuildingSite } from "../models";
import StatusBadge from "./StatusBadge";

interface BuildingSitesTableProps {
  data: BuildingSite[];
  onOpenModalForEdition: (id: number) => void;
  onOpenDeleteDialog: (id: number, description: string) => void;
  onInactivateBuildingSite: (id: number) => void;
}

export default function BuildingSitesTable(props: BuildingSitesTableProps) {
  const {
    data,
    onInactivateBuildingSite,
    onOpenDeleteDialog,
    onOpenModalForEdition,
  } = props;

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Código</Th>
          <Th>Descrição</Th>
          <Th>Status</Th>
          <Th>Endereço</Th>
          <Th>Bairro</Th>
          <Th>Cidade</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((bs) => (
          <Tr key={bs.id}>
            <Td>{bs.id}</Td>
            <Td>{bs.description}</Td>
            <Td>{bs.status && <StatusBadge status={bs.status} />}</Td>
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
                    onClick={() => onOpenDeleteDialog(bs.id, bs.description)}
                  />
                </Tooltip>
                <Menu>
                  <MenuButton variant="ghost" as={Button}>
                    <SettingsIcon />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => onInactivateBuildingSite(bs.id)}>
                      Inativar
                    </MenuItem>
                    <MenuItem>Deletar</MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
