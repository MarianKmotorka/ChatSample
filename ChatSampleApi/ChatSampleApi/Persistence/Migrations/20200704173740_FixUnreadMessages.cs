using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatSampleApi.Persistence.Migrations
{
    public partial class FixUnreadMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_AuthUser_AuthUserId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_AuthUserId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "AuthUserId",
                table: "Message");

            migrationBuilder.CreateTable(
                name: "UserUnreadMessages",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    MessageId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserUnreadMessages", x => new { x.MessageId, x.UserId });
                    table.ForeignKey(
                        name: "FK_UserUnreadMessages_Message_MessageId",
                        column: x => x.MessageId,
                        principalTable: "Message",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserUnreadMessages_AuthUser_UserId",
                        column: x => x.UserId,
                        principalTable: "AuthUser",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserUnreadMessages_UserId",
                table: "UserUnreadMessages",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserUnreadMessages");

            migrationBuilder.AddColumn<string>(
                name: "AuthUserId",
                table: "Message",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_AuthUserId",
                table: "Message",
                column: "AuthUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Message_AuthUser_AuthUserId",
                table: "Message",
                column: "AuthUserId",
                principalTable: "AuthUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
