"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import LoadingSpin from "../LoadingSpin";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {disableCodeButton && <LoadingSpin width="w-6" height="h-6" />}
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
        <div className="w-[600px] h-[490px] bg-black text-white text-center">
          <h2 className="text-3xl font-bold mb-5 text-yellow">
            AJOUT DE PATCH
          </h2>
          <p>
            Liste des changements à indiquer au retour à la ligne sans tirets
          </p>
          <p className="font-bold">ATTENTION : {"L'ajout est definitif"}</p>
          <label className="flex items-center gap-2 mx-auto justify-center my-5">
            Type de version :
            <ReactSelect
              options={patchOptions}
              isSearchable={false}
              styles={{
                menu: (base: any) => ({
                  ...base,
                  color: "black",
                }),
              }}
              onChange={(e: any) =>
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
          {disablePatchButton && <LoadingSpin width="w-6" height="h-6" />}
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
