"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "@/components/ui/Button";
import Modal from "@/components/Modal";
import { TableLoading } from "@/components/loading/TableLoading";

interface Person {
  id: number;
  name: string;
}

const DebtTable: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [debtMatrix, setDebtMatrix] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showAddDebtModal, setShowAddDebtModal] = useState(false);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(false);
  const [showRemoveDebtModal, setShowRemoveDebtModal] = useState(false);
  const [newPerson, setNewPerson] = useState<string>("");
  const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [debtDetails, setDebtDetails] = useState<{
    fromId: number;
    toId: number;
    amount: number;
  }>({ fromId: 0, toId: 0, amount: 0 });

  // Fetch the persons and debts
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/persons")
      .then((response) => {
        setPersons(response.data.persons);
        console.log(response.data.persons);
        setDebtMatrix(response.data.debts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   // Attach event listener
  //   document.addEventListener('mousedown', handleClickOutside);

  //   // Cleanup listener on component unmount
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
  
    // Attach event listener
    document.addEventListener('mousedown', handleClickOutside);
  
    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  //   adding new member
  const handleAddMember = () => {
    const trimmedName = newPerson.trim(); // Trim whitespace
    if (!trimmedName) return; // Check if the name is empty after trimming

    axios
      .post("http://localhost:3001/api/persons", { name: trimmedName })
      .then((response) => {
        setPersons((prevPersons) => [
          ...prevPersons,
          { id: response.data.personId, name: trimmedName },
        ]);
        setNewPerson(""); // Clear input
        setShowAddMemberModal(false); // Close the modal
      })
      .catch((error) => {
        console.error("Error adding member", error);
        // Optionally show an error message to the user
      });
  };

  //   removing memeber
  const handleRemoveMember = (id: number | undefined) => {
    axios
      .delete(`http://localhost:3001/api/persons/${id}`)
      .then((response) => {
        setPersons((prevPersons) =>
          prevPersons.filter((person) => person.id !== id)
        );
        console.log(response.data.message);
        setShowRemoveMemberModal(false); // Close the modal
      })
      .catch((error) => console.error("Error removing member", error));
  };

  // removing debt
  const handleRepayDebt = (fromId: any, toId: any, amount: any) => {
    axios
      .post("http://localhost:3001/api/debts/repay", { fromId, toId, amount })
      .then((response) => {
        console.log(response.data.message);
        setShowRemoveDebtModal(false); // Close the modal
      })
      .catch((error) => console.error("Error repaying debt", error));
  };

  //   Adding debt
  const handleAddDebt = () => {
    const { fromId, toId, amount } = debtDetails;
    if (!fromId || !toId || !amount) return;

    axios
      .post("http://localhost:3001/api/debts", { fromId, toId, amount })
      .then(() => {
        const updatedDebtMatrix = [...debtMatrix];
        updatedDebtMatrix[fromId][toId] += amount;
        setDebtMatrix(updatedDebtMatrix);
        setDebtDetails({ fromId: 0, toId: 0, amount: 0 });
        setShowAddDebtModal(false); // Close the modal
      })
      .catch((error) => console.error("Error updating debt", error));
  };

  // removing debt
  const handleRemoveDebt = () => {
    const { fromId, toId,amount } = debtDetails;
    if (!fromId ||!toId ||!amount) return;

    axios.post('http0.://localhost:3001/api/debts/repay', { fromId, toId, amount })
    .then(() => {
      const updatedDebtMatrix = [...debtMatrix];
      updatedDebtMatrix[fromId][toId] -= amount;
      setDebtMatrix(updatedDebtMatrix);
      setDebtDetails({ fromId: 0, toId: 0, amount: 0 });
      setShowRemoveDebtModal(false); // Close the modal
    })
  };


  return (
    <div className="my-10">
      <div className="mx-auto w-[80%] flex justify-between mb-5">
        <h1>Debts</h1>

        {/* here is the dropdown */}
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Actions
              {/* Dropdown arrow */}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 outline-none">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {[
                  { label: "Add Member", action: () => setShowAddMemberModal(true) },
                  { label: "Add Debt", action: () => setShowAddDebtModal(true) },
                  { label: "Remove Member", action: () => setShowRemoveMemberModal(true) },
                  { label: "Repay Debt", action: () => setShowRemoveDebtModal(true) },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={(e) => {null
                      e.stopPropagation(); // Prevent closing the dropdown
                      item.action();
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* here are the modals */}
      <Modal
        show={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        title="Add New Member"
      >
        <input
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
          placeholder="Enter member name"
          className="border rounded w-full p-2 mb-4"
        />
        <Button content="Add Member" onClick={handleAddMember} />
      </Modal>

      <Modal
        show={showRemoveMemberModal}
        onClose={() => setShowRemoveMemberModal(false)}
        title="Remove a Member"
      >
        <input
          type="number"
          value={selectedMemberId !== undefined ? selectedMemberId : ''} // Use empty string for undefined
          onChange={(e) => setSelectedMemberId(e.target.value ? Number(e.target.value) : undefined)} // Convert input to number
          placeholder="Enter member ID to be removed"
          className="border rounded w-full p-2 mb-4"
        />
        <Button content="Remove Member" onClick={() => handleRemoveMember(selectedMemberId)} />
      </Modal>

      {/* add debt modal */}
      <Modal
        show={showAddDebtModal}
        onClose={() => setShowAddDebtModal(false)}
        title="Add Debt"
      >
        <select
          value={debtDetails.fromId}
          onChange={(e) =>
            setDebtDetails({ ...debtDetails, fromId: Number(e.target.value) })
          }
          className="border rounded w-full p-2 mb-4"
        >
          <option value={0}>Select Payer</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <select
          value={debtDetails.toId}
          onChange={(e) =>
            setDebtDetails({ ...debtDetails, toId: Number(e.target.value) })
          }
          className="border rounded w-full p-2 mb-4"
        >
          <option value={0}>Select Receiver</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={debtDetails.amount}
          onChange={(e) =>
            setDebtDetails({ ...debtDetails, amount: Number(e.target.value) })
          }
          placeholder="Enter amount"
          className="border rounded w-full p-2 mb-4"
        />
        <Button content="Add Debt" onClick={handleAddDebt} />
      </Modal>


      {/* remove debt modal */}
      <Modal
        show={showRemoveDebtModal}
        onClose={() => setShowRemoveDebtModal(false)}
        title="Remove Debt"
      >
        <select
          value={debtDetails.fromId}
          onChange={(e) =>
            setDebtDetails({ ...debtDetails, fromId: Number(e.target.value) })
          }
          className="border rounded w-full p-2 mb-4"
        >
          <option value={0}>Select Payer</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <select
          value={debtDetails.toId}
          onChange={(e) =>
            setDebtDetails({ ...debtDetails, toId: Number(e.target.value) })
          }
          className="border rounded w-full p-2 mb-4"
        >
          <option value={0}>Select Receiver</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={debtDetails.amount}
          onChange={(e) =>
            setDebtDetails({ ...debtDetails, amount: Number(e.target.value) })
          }
          placeholder="Enter amount to remove"
          className="border rounded w-full p-2 mb-4"
        />
        <Button content="Remove Debt" onClick={handleRemoveDebt} />
      </Modal>



      {loading ? (
        <TableLoading />
      ) : (
        <div className="w-[80%] overflow-auto rounded-lg shadow mx-auto">
          <table border={1} className="w-full">
            <thead className="bg-[#c0c5e1] border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-md font-semibold tracking-wide text-left text-red-500">
                  Payers
                </th>{" "}
                {/* Empty cell for the top-left corner */}
                {persons.map((person) => (
                  <th
                    key={person.id}
                    className="p-3 text-md font-semibold tracking-wide text-left"
                  >
                    {person.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {persons.map((person, rowIndex) => (
                <tr
                  key={person.id}
                  className={rowIndex % 2 == 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="p-3 text-md text-gray-700">{person.name}</td>{" "}
                  {/* Row label */}
                  {debtMatrix[rowIndex].map((amount, colIndex) => (
                    <td key={colIndex} className="p-3 text-md text-gray-700">
                      <span
                        className={`p-1.5 text-xs font-medium tracking-wider rounded-lg ${
                          amount == 0
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {amount}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DebtTable;
