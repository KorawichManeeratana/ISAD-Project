import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import React, { Component } from "react";

export default class Reportform extends Component<{
  ac_id: number;
  rep_id: number;
  rep_name: string;
  owner: string;
}> {
  public async getDeleteAccount() {
    try {
      let res = await fetch(
        "http://localhost:3000/attractions/api_deleteAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ac_id: this.props.ac_id,
          }),
        }
      );
      if (res.ok) {
        console.log("Account delete Success!!");
        window.location.reload();
      }
    } catch (error) {
      console.log("Error Occur when trying to delete this account");
    }
  }
  render() {
    return (
      <div className="">
        <div className="grid grid-cols-5 bg-slate-700 text-white p-1 hover:bg-white hover:text-black">
          <Link
            href={{
              pathname: `/recipe/${this.props.rep_id}/`,
              query: {
                rep_id: this.props.rep_id,
              },
            }}
          >
            <div className="basis-1/4">{this.props.rep_id}</div></Link>
            <Link
            href={{
              pathname: `/recipe/${this.props.rep_id}/`,
              query: {
                rep_id: this.props.rep_id,
              },
            }}
          ><div className="basis-1/2">{this.props.rep_name}</div></Link>
          <Link
            href={{
              pathname: `/profile/${this.props.ac_id}/`,
              query: {
                blahblah: this.props.ac_id,
              },
            }}
          ><div className="basis-1/2">{this.props.owner}</div></Link>
          <Link
            href={{
              pathname: `/edit_recipe/${this.props.rep_id}/`,
              query: {
                rep_id: this.props.rep_id,
              },
            }}
          >
            <div className="basis-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg>
            </div>
          </Link>
          <div className="basis-1/2">X</div>
        </div>
      </div>
    );
  }
}
