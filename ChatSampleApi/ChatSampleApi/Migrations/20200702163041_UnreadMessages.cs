using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatSampleApi.Migrations
{
    public partial class UnreadMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChatUserChatId",
                table: "Message",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChatUserUserId",
                table: "Message",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Message_ChatUserChatId_ChatUserUserId",
                table: "Message",
                columns: new[] { "ChatUserChatId", "ChatUserUserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Message_ChatUsers_ChatUserChatId_ChatUserUserId",
                table: "Message",
                columns: new[] { "ChatUserChatId", "ChatUserUserId" },
                principalTable: "ChatUsers",
                principalColumns: new[] { "ChatId", "UserId" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Message_ChatUsers_ChatUserChatId_ChatUserUserId",
                table: "Message");

            migrationBuilder.DropIndex(
                name: "IX_Message_ChatUserChatId_ChatUserUserId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "ChatUserChatId",
                table: "Message");

            migrationBuilder.DropColumn(
                name: "ChatUserUserId",
                table: "Message");
        }
    }
}
