"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import ReactSelect from "react-select";

const NavBarEditor: React.FC = () => {
  const [disableCodeButton, setDisableCodeButton] = useState<boolean>(false);
  const [modalCode, setModalCode] = useState<boolean>(false);
  const [codesInput, setCodesInput] = useState<string>("");

  const [disablePatchButton, setDisablePatchButton] = useState<boolean>(false);
  const [modalPatch, setModalPatch] = useState<boolean>(false);
  const [patchDescInput, setPatchDescInput] = useState<string>("");
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [patchType, setPatchType] = useState<any>("");
  const patchOptions = [
    {
      value: "minor",
      label: "Mineur",
    },
    {
      value: "major",
      label: "Majeur",
    },
  ];

  const modalStyle = {
    overlay: {
      zIndex: "50",
      backgroundColor: "#000000CC",
      overflow: "hidden",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000000",
      overflow: "hidden",
    },
  };

  const handleCodeClick = () => {
    setDisableCodeButton(true);
    fetch("/api/other", {
      method: "PUT",
      cache: "no-cache",
      next: { revalidate: 0 },
      body: JSON.stringify({ data: { codes: codesInput } }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        if (data.message && data.message === "ok") {
          toast.success("Sauvegarde terminé");
        } else {
          toast.error("Erreur de sauvegarde");
        }
        setDisableCodeButton(false);
      });
  };

  const handlePatchClick = () => {
    setDisablePatchButton(true);
    const newVersion: number =
      patchType.value === "major"
        ? Number(lastUpdate.toString().split(".")[0]) + 1 // Defini une valeur majeur
        : patchType.value === "minor"
        ? Math.round((lastUpdate + 0.01) * 100) / 100 // Defini une valeur mineur
        : 99;

    fetch("/api/changelog", {
      method: "POST",
      cache: "no-cache",
      next: { revalidate: 0 },
      body: JSON.stringify({
        data: {
          version: newVersion,
          desc: patchDescInput,
        },
      }),
    })
      .then((res) => res.json())
      .then((data: any) => {
        if (data.status && data.status === 201) {
          toast.success("Sauvegarde terminé");
          setLastUpdate(newVersion);
          setPatchDescInput("");
          setModalPatch(false);
        } else if (data.status && data.status === 204)
          toast.error("Merci de remplir la description");
        else toast.error("Erreur de sauvegarde");

        setDisablePatchButton(false);
      });
  };

  useEffect(() => {
    // Recupère les infos de codes jades
    fetch("/api/other/all")
      .then((res) => res.json())
      .then((json: any) => setCodesInput(json.data.codes));

    //Recupère la dernière version du changelog
    fetch("/api/changelog/all")
      .then((res) => res.json())
      .then((json: any) => setLastUpdate(json.data[0].version));
    setPatchType(patchOptions[0]);
  }, []);

  return (
    <nav className="bg-[#030303] h-16 text-white" id="appNav">
      {/* Modal Codes */}
      <Modal
        isOpen={modalCode}
        onRequestClose={() => setModalCode(false)}
        ariaHideApp={false}
        style={modalStyle}
      >
        <div className="w-[600px] h-[480px] bg-black text-white text-center">
          <h2 className="text-3xl font-bold mb-5 text-yellow">
            GESTION DE CODES
          </h2>
          <p>Codes séparés par retour à la ligne</p>
          <p>
            <strong>Si nouveau code :</strong> Indiquer le code, mettre un
            espace suivie de (NEW)
          </p>
          <div className="flex justify-center items-center my-5">
            <textarea
              value={codesInput}
              onChange={(e) => setCodesInput(e.target.value)}
              className={`rounded-xl border px-2 py-1 text-black w-3/4 h-[300px]`}
            />
          </div>
          <button
            disabled={disableCodeButton}
            className="flex justify-center text-xl mx-auto w-full items-center gap-2 px-3 py-1 rounded-full bg-green text-black disabled:bg-gray ml-auto"
            onClick={handleCodeClick}
          >
            <span>{disableCodeButton ? "Sauvegarde..." : "Sauvegarder"}</span>
            {disableCodeButton && (
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray animate-spin  fill-orange"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            )}
          </button>
        </div>
      </Modal>

      {/* MODAL PATCH */}
      <Modal
        isOpen={modalPatch}
        onRequestClose={() => setModalPatch(false)}
        ariaHideApp={false}
        style={modalStyle}
      >
        <div className="w-[600px] h-[470px] bg-black text-white text-center">
          <h2 className="text-3xl font-bold mb-5 text-yellow">
            AJOUT DE PATCH
          </h2>
          <p>
            Liste des changements à indiquer au retour à la ligne sans tirets
          </p>
          <label className="flex items-center gap-2 mx-auto justify-center my-5">
            Type de version :
            <ReactSelect
              options={patchOptions}
              isSearchable={false}
              styles={{
                menu: (base) => ({
                  ...base,
                  color: "black",
                }),
              }}
              onChange={(e) =>
                setPatchType({
                  value: e?.value,
                  label: e?.label,
                })
              }
              value={patchType}
              className="w-40"
            />
          </label>
          <textarea
            value={patchDescInput}
            onChange={(e) => setPatchDescInput(e.target.value)}
            className={`rounded-xl border px-2 py-1 text-black w-3/4 h-[300px]`}
          />
        </div>
        <button
          disabled={disablePatchButton}
          className="flex justify-center text-xl mx-auto w-full items-center gap-2 px-3 py-1 rounded-full bg-green text-black disabled:bg-gray ml-auto"
          onClick={handlePatchClick}
        >
          <span>{disablePatchButton ? "Sauvegarde..." : "Sauvegarder"}</span>
          {disablePatchButton && (
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-gray animate-spin  fill-orange"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </button>
      </Modal>

      <ul className="flex px-7 items-center h-full text-xl">
        <Link href={"/hsr-editor"} className="font-bold">
          Espace Editeur
        </Link>
        <div className="flex items-center gap-5 ml-auto">
          <button
            className="px-3 py-2 rounded-full bg-green text-black disabled:bg-gray ml-auto"
            onClick={() => setModalCode(true)}
          >
            Gestion de codes
          </button>
          <button
            className="px-3 py-2 rounded-full bg-green text-black disabled:bg-gray ml-auto"
            onClick={() => setModalPatch(true)}
          >
            Ajout de patch
          </button>
        </div>
        <span className="ml-auto font-medium">
          <Link href={"/hsr-editor/logout"}>Deconnexion</Link>
        </span>
      </ul>
    </nav>
  );
};

export default NavBarEditor;
